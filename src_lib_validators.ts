import { z } from "zod";

export const StatusEnum = z.enum(["new", "contacted", "scheduled", "completed"]);
export type IntakeStatus = z.infer<typeof StatusEnum>;

export const PriorityEnum = z.enum(["low", "normal", "high", "urgent"]);
export type IntakePriority = z.infer<typeof PriorityEnum>;

export const IntakeSchema = z.object({
  contactName: z.string().min(2),
  phone: z.string().min(7),
  email: z.string().email().optional().or(z.literal("")),
  serviceAddress: z.string().min(5),
  serviceType: z.enum(["supplies", "maintenance", "care", "transportation", "scheduling"]),
  urgency: z.enum(["same_day", "24_48", "scheduled"]),
  notes: z.string().max(800).optional().or(z.literal("")),
  preferredContact: z.enum(["phone", "email", "text"]),
  consent: z.literal(true),

  // NEW optional fields (set by admin later)
  status: StatusEnum.optional(),
  priority: PriorityEnum.optional(),
  assignedTo: z.string().max(120).optional().or(z.literal(""))
});

export type IntakeInput = z.infer<typeof IntakeSchema>;

export const PartnerReferralSchema = z.object({
  organization: z.string().min(2),
  referrerName: z.string().min(2),
  referrerPhone: z.string().min(7),
  referrerEmail: z.string().email(),
  referralType: z.enum(["discharge", "clinic", "home_health_agency", "assisted_living", "other"]),
  notes: z.string().max(800).optional().or(z.literal(""))
});

export type PartnerReferralInput = z.infer<typeof PartnerReferralSchema>;
