/*
    There are some problems when using the "protocol" utility:
    1. The constant "protobufPackage" is exported in all files, which causes conflicts when re-exporting in the index.ts file.
    2. The protocol utility replaces the attributes "_id" and "__v" with "Id" and "V", respectively.
    3. The protocol utility replaces strings in "camelCase" format to "camel_case" format. 
    This script was written to solve this problems.
*/

const fs = require("fs");
const path = require("path");

const files = [
    path.join(__dirname, "../common/grpc/generated/users.ts"),
    path.join(__dirname, "../common/grpc/generated/documents.ts"),
    path.join(__dirname, "../common/grpc/generated/notifications.ts"),
    path.join(__dirname, "../common/grpc/generated/organizations.ts"),
    path.join(__dirname, "../common/grpc/generated/workflows.ts"),
    path.join(__dirname, "../common/grpc/generated/google/protobuf/empty.ts"),
    path.join(__dirname, "../common/grpc/generated/google/protobuf/wrappers.ts")
];

const replacements = [
    {
        from: "export const protobufPackage",
        to: "const protobufPackage"
    },
    {
        from: "Id:",
        to: "_id:"
    },
    {
        from: "V:",
        to: "__v:"
    },
    {
        from: "user_id",
        to: "userId"
    },
    {
        from: "author_id",
        to: "authorId"
    },
    {
        from: "type_id",
        to: "typeId"
    },
    {
        from: "aim_id",
        to: "aimId"
    },
    {
        from: "organization_id",
        to: "organizationId"
    },
    {
        from: "export const GOOGLE_PROTOBUF_PACKAGE_NAME",
        to: "const GOOGLE_PROTOBUF_PACKAGE_NAME"
    },
    {
        from: "const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);",
        to: `
        const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);

        if (!descriptor) {
            continue;
        }
        `
    }
];

for (const file of files) {
    fs.readFile(file, "utf8", (error, data) => {
        if (error) {
            console.error(error);
            return;
        }

        for (const replacement of replacements) {
            data = data.replaceAll(replacement.from, replacement.to);
        }

        fs.writeFile(file, data, "utf8", error => {
            if (error) {
                console.error(error);
                return;
            }
        });
    });
}
