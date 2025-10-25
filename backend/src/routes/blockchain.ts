import { Router, Request, Response } from "express";
import { authenticateToken, requireRole } from "../middleware/auth";
import { prisma } from "../utils/database";

const router = Router();

router.post(
  "/create",
  authenticateToken,
  requireRole(["ADMIN"]),
  async (req: Request, res: Response) => {
    try {
      const { certificateId } = req.body;
      if (!req.user) return res.status(401).json({ error: "Authentication required" });
      const certificate = await prisma.certificate.findUnique({ where: { id: certificateId } });
      if (!certificate) return res.status(404).json({ error: "Certificate not found" });
      const blockchainResponse = await fetch(
        `${process.env.BLOCKCHAIN_API_URL}/store`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.BLOCKCHAIN_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ certificateId, userId: req.user.id }),
        }
      );
      const result = await blockchainResponse.json();
      res.json({ message: "Stored on blockchain", result });
    } catch (error) {
      res.status(500).json({ error: "Failed to store on blockchain" });
    }
  }
);

export default router;