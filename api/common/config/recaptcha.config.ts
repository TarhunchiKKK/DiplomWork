import { ConfigService } from "@nestjs/config";
import { GoogleRecaptchaModuleOptions } from "@nestlab/google-recaptcha";

export async function getRecaptchaConfig(configService: ConfigService): Promise<GoogleRecaptchaModuleOptions> {
    return {
        secretKey: configService.getOrThrow<string>("GOOGLE_RECAPTCHA_SECRET_KEY"),
        response: req => req.headers.recaptcha
    };
}
