import { Router, Request, Response } from "express";
import { authenticateToken, requireRole } from "../middleware/auth";
import { prisma } from "../utils/database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Extend Express Request interface to include 'user'
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const router = Router();

router.post("/register", async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    // Basic validation
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        role: "CITIZEN", // Default role
        isActive: true,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
        createdAt: true,
      }
    });

    res.status(201).json({ 
      message: "User created successfully", 
      user 
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Failed to register user" });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await prisma.user.findUnique({ 
      where: { email } 
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    if (!user.isActive) {
      return res.status(401).json({ error: "Account is deactivated" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user.id }, 
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    res.json({ 
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        isActive: user.isActive,
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Failed to login" });
  }
});

router.get("/profile", authenticateToken, async (req: Request, res: Response) => {
  // req.user should now be properly typed
  res.json({ 
    user: req.user,
    message: "Profile retrieved successfully"
  });
});

// Example of protected route with role requirement
router.get("/admin", authenticateToken, requireRole(["ADMIN"]), async (req: Request, res: Response) => {
  res.json({ 
    message: "Admin access granted",
    user: req.user
  });
});

export default router;