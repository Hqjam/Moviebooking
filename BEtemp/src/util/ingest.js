import { Inngest } from "inngest";
import User from "../models/user.js"; // ✅ make sure your User model is imported

export const inngest = new Inngest({ id: "my-app" });

/**
 * Clerk User Created → Add to MongoDB
 */
const syncUser = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    console.log("👤 User created event received:", event);

    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: `${first_name} ${last_name}`,
      image: image_url,
    };

    await User.create(userData);
    console.log("✅ User synced to MongoDB:", userData);
  }
);

/**
 * Clerk User Updated → Update in MongoDB
 */
const syncUserUpdation = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    console.log("✏️ User updated event received:", event);

    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    const updatedUserData = {
      email: email_addresses[0].email_address,
      name: `${first_name} ${last_name}`,
      image: image_url,
    };

    await User.findByIdAndUpdate(id, updatedUserData, { new: true });
    console.log("🔄 User updated in MongoDB:", updatedUserData);
  }
);

/**
 * Clerk User Deleted → Remove from MongoDB
 */
const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-from-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    console.log("🗑️ User deleted event received:", event);

    const { id } = event.data;

    await User.findByIdAndDelete(id);
    console.log(`❌ User with ID ${id} deleted from MongoDB`);
  }
);

export const functions = [syncUser, syncUserUpdation, syncUserDeletion];
