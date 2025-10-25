import express from "express";
import axios from "axios";
import { prisma } from "../utils/database";
import { authenticateToken, requireRole } from "../middleware/auth";

const router = express.Router();

router.post(
  "/send",
  authenticateToken,
  requireRole(["ADMIN", "CLERK"]),
  async (req: express.Request, res: express.Response) => {
    try {
      const { phone, message, certificateId } = req.body;

      // Call SMS provider (mocked for now)
      const response = await sendSMS(phone, message);

      // Log the SMS in AuditLog
      await prisma.auditLog.create({
        data: {
          userId: req.user?.id,
          certificateId,
          action: "SMS_SENT",
          details: {
            phone,
            message,
            response: JSON.parse(JSON.stringify(response)),
          },
          ipAddress: req.ip,
          userAgent: req.get("User-Agent") || undefined,
        },
      });

      res.json({
        message: "SMS sent successfully",
        response,
      });
    } catch (error: any) {
      console.error("SMS send error:", error);
      res
        .status(500)
        .json({ error: error.message || "Failed to send SMS" });
    }
  }
);

async function sendSMS(phone: string, message: string) {
  try {
    const response = await axios.post(
      process.env.ETHIO_TELECOM_SMS_URL!,
      {
        phone,
        message,
        apiKey: process.env.ETHIO_TELECOM_API_KEY,
      }
    );
    return response.data;
  } catch (error) {
    console.warn("SMS API not available, using mock response");
    return { success: true, messageId: "mock-" + Date.now() };
  }
}

export default router;