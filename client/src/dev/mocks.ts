import { TComment, TDocument, TDocumentShortData } from "@/entities/documents";
import { AuthType, Role } from "@/entities/users";
import { TProfile } from "@/features/auth";

const documentsShortData: TDocumentShortData[] = [
    {
        id: "1",
        title: "Document 1",
        createdAt: new Date("2023-01-01")
    },
    {
        id: "2",
        title: "Document 2",
        createdAt: new Date("2023-01-03")
    },
    {
        id: "3",
        title: "Document 3",
        createdAt: new Date("2023-01-05")
    },
    {
        id: "4",
        title: "Document 1",
        createdAt: new Date("2023-01-01")
    },
    {
        id: "5",
        title: "Document 2",
        createdAt: new Date("2023-01-03")
    },
    {
        id: "6",
        title: "Document 3",
        createdAt: new Date("2023-01-05")
    },
    {
        id: "7",
        title: "Document 1",
        createdAt: new Date("2023-01-01")
    },
    {
        id: "8",
        title: "Document 2",
        createdAt: new Date("2023-01-03")
    },
    {
        id: "9",
        title: "Document 3",
        createdAt: new Date("2023-01-05")
    },
    {
        id: "10",
        title: "Document 1",
        createdAt: new Date("2023-01-01")
    },
    {
        id: "11",
        title: "Document 2",
        createdAt: new Date("2023-01-03")
    },
    {
        id: "33",
        title: "Document 3",
        createdAt: new Date("2023-01-05")
    }
];

const document: TDocument = {
    id: "1",
    title: "Document 1",
    aimId: "1",
    typeId: "1",
    authorId: "1",
    isUrgent: true
};

const profile: TProfile = {
    id: "1",
    email: "kostabarilo12@gmial.com",
    authType: AuthType.BASIC,
    organizationId: "1",
    role: Role.USER,
    username: "Kostya Barilo"
};

const verifyDocumentHashDto = {
    hash: "",

    sign: ""
};

const comments: TComment[] = [
    {
        id: "1",
        message: "Message 1",
        createdAt: new Date(),
        creatorId: "1"
    },
    {
        id: "2",
        message: "Message 2",
        createdAt: new Date(),
        creatorId: "1"
    },
    {
        id: "3",
        message: "Message 3",
        createdAt: new Date(),
        creatorId: "1"
    },
    {
        id: "4",
        message: "Message 4",
        createdAt: new Date(),
        creatorId: "1"
    },
    {
        id: "5",
        message: "Message 5",
        createdAt: new Date(),
        creatorId: "1"
    },
    {
        id: "6",
        message: "Message 6",
        createdAt: new Date(),
        creatorId: "1"
    }
];

export const mocks = {
    document,
    documentsShortData,
    profile,
    verifyDocumentHashDto,
    comments
};
