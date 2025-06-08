export const environment = {
    projectEnv: process.env.PRJECT_ENV!,
    // API
    apiUrl: process.env.API_URL!,

    // Tanstack Query
    staleTime: +process.env.STALE_TIME_MINUTES!,
    gcTime: +process.env.GC_TIME_MINUTES!,

    // Cryptography
    symmetricEncryptionKey: process.env.SYMMETRIC_ENCRYPTION_KEY!,
    symmetricEncryptionIv: process.env.SYMMETRIC_ENCRYPTION_IV!,
    hashingKey: process.env.HASHING_KEY!,

    // S3
    s3Endpoint: process.env.S3_ENDPOINT!,
    s3Region: process.env.S3_REGION!,
    s3AccessKeyId: process.env.S3_ACCESS_KEY_ID!,
    s3SecretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
    documentsS3BucketName: process.env.DOCUMENTS_S3_BUCKET_NAME!
};
