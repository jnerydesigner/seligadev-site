import { env } from "./zod-env";
import bcrypt from "bcryptjs";

export class ApiKeyGenerator {
  private baseKey = "apikeynaofunciona";
  private saltRounds = 12;

  async generateApiKeyHash() {
    try {
      const hash = await bcrypt.hash(this.baseKey, this.saltRounds);
      console.log("Hash gerado:", hash);
      return hash;
    } catch (error) {
      console.error("Erro ao gerar hash:", error);
      throw error;
    }
  }
}
