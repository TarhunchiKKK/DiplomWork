/*
    There are 2 problems when using the "protocol" utility:
    1. The constant "protobufPackage" is exported in all files, which causes conflicts when re-exporting to the index.ts file.
    2. The protocol utility replaces the attributes "_id" and "__v" with "Id" and "V", respectively.
    This script was written to solve this problems.
*/

const fs = require("fs");
const path = require("path");

const files = [
    path.join(__dirname, "../common/grpc/generated/authentication.ts"),
    path.join(__dirname, "../common/grpc/generated/documents-management.ts"),
    path.join(__dirname, "../common/grpc/generated/notifications.ts"),
    path.join(__dirname, "../common/grpc/generated/organizations-management.ts"),
    path.join(__dirname, "../common/grpc/generated/users-management.ts"),
    path.join(__dirname, "../common/grpc/generated/workflows-management.ts")
];

const replacements = [
    {
        from: "export const protobufPackage",
        to: "const protobufPackage"
    },
    {
        from: "Id",
        to: "_id"
    },
    {
        from: "V",
        to: "__v"
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
