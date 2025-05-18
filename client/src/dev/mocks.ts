import { TComment, TDocument, TDocumentShortData, TVersion } from "@/entities/documents";
import { NotificationStatus, NotificationSubject, TNotification } from "@/entities/notifications";
import { TOrganization } from "@/entities/organizations";
import { AccountStatus, AuthType, Role, TUserInfo } from "@/entities/users";
import { TProfile } from "@/features/auth";

const document: TDocument = {
    id: "1",
    title: "Заявление на отпуск.doc",
    aimId: "1",
    typeId: "1",
    authorId: "1",
    isUrgent: true
};

const profile: TProfile = {
    id: "1",
    email: "ivanov@gmial.com",
    authType: AuthType.BASIC,
    organizationId: "1",
    role: Role.USER,
    username: "Nikolai Ivanov"
};

const verifyDocumentHashDto = {
    hash: "",

    sign: ""
};

const comments: TComment[] = [
    {
        id: "1",
        message: "Нужно исправить форматирование в начале 3 абзаца",
        createdAt: new Date(),
        creatorId: "1"
    },
    {
        id: "2",
        message: "Неправильная дата начала отпуска",
        createdAt: new Date(),
        creatorId: "2"
    },
    {
        id: "3",
        message: "Уже вышел новый формат",
        createdAt: new Date(),
        creatorId: "3"
    },
    {
        id: "4",
        message: "Неправильный отступ сверху",
        createdAt: new Date(),
        creatorId: "4"
    },
    {
        id: "5",
        message: "Удачного отпуска",
        createdAt: new Date(),
        creatorId: "5"
    },
    {
        id: "6",
        message: "Неправильный отступ снизу",
        createdAt: new Date(),
        creatorId: "6"
    }
];

const notifications: TNotification[] = [
    {
        id: "1",
        createdAt: new Date("2025-05-18T14:30:00.000Z"),
        status: NotificationStatus.CHECKED,
        subject: NotificationSubject.COMMENT_UPDATED,
        message: "Пользователь evgenychernov@gmail.com обновил комментарий к вашему документу 'Отчет по налогам.xls'"
    },
    {
        id: "2",
        createdAt: new Date("2025-05-18T14:04:00.000Z"),
        status: NotificationStatus.ACTIVE,
        subject: NotificationSubject.COMMENT_CREATED,
        message: "Пользователь annalipaskaya@gmail.com обновил комментарий к вашему документу 'Отчет по налогам.xls'"
    },
    {
        id: "3",
        createdAt: new Date("2025-05-18T11:39:00.000Z"),
        status: NotificationStatus.CHECKED,
        subject: NotificationSubject.PASSWORD_RECOVERY,
        message: "Ваш пароль успешно обновлен"
    },
    {
        id: "4",
        createdAt: new Date("2025-05-17T16:21:00.000Z"),
        status: NotificationStatus.CHECKED,
        subject: NotificationSubject.ACCOUNT_ACTIVATION,
        message: "Ваш аккаунт был активирован администратором организации"
    },
    {
        id: "5",
        createdAt: new Date("2025-05-17T15:20:00.000Z"),
        status: NotificationStatus.ACTIVE,
        subject: NotificationSubject.DOCUMENT_REJECTED,
        message: "Ваш документ 'Схема микроконтроллера.vsdx' был отклонен"
    },
    {
        id: "6",
        createdAt: new Date("2025-05-15T12:44:00.000Z"),
        status: NotificationStatus.ACTIVE,
        subject: NotificationSubject.WORKFLOW_DELETED,
        message: "Пользователь ivanbelkin@gmail.com удалил маршрут согласования документа 'Заявление на отпуск.doc'"
    },
    {
        id: "7",
        createdAt: new Date("2025-05-15T10:06:00.000Z"),
        status: NotificationStatus.CHECKED,
        subject: NotificationSubject.DOCUMENT_APPROVED,
        message: "Ваш документ 'Аппляция.doc' полностью утвержден"
    },
    {
        id: "8",
        createdAt: new Date("2025-05-14T16:21:00.000Z"),
        status: NotificationStatus.ACTIVE,
        subject: NotificationSubject.PASSWORD_RECOVERY,
        message: "аш пароль успешно обновлен"
    },
    {
        id: "9",
        createdAt: new Date(),
        status: NotificationStatus.ACTIVE,
        subject: NotificationSubject.DOCUMENT_SIGNED,
        message: "Message"
    },
    {
        id: "10",
        createdAt: new Date(),
        status: NotificationStatus.ACTIVE,
        subject: NotificationSubject.ACCOUNT_ACTIVATION,
        message: "Message"
    },
    {
        id: "11",
        createdAt: new Date(),
        status: NotificationStatus.ACTIVE,
        subject: NotificationSubject.ACCOUNT_ACTIVATION,
        message: "Message"
    },
    {
        id: "12",
        createdAt: new Date(),
        status: NotificationStatus.ACTIVE,
        subject: NotificationSubject.WORKFLOW_DELETED,
        message: "Message"
    },
    {
        id: "13",
        createdAt: new Date(),
        status: NotificationStatus.ACTIVE,
        subject: NotificationSubject.ACCOUNT_ACTIVATION,
        message: "Message"
    }
];

const users: TUserInfo[] = [
    {
        id: "1",
        email: "olegchernov@gmail.com",
        username: "1",
        status: AccountStatus.DEACTIVATED
    },
    {
        id: "2",
        email: "igorsmirnov@gmail.com",
        username: "2",
        status: AccountStatus.ACTIVE
    },
    {
        id: "3",
        email: "evgenyonegin@gmail.com",
        username: "3",
        status: AccountStatus.ACTIVE
    },
    {
        id: "4",
        email: "allalitvinko@gmail.com",
        username: "4",
        status: AccountStatus.DEACTIVATED
    },
    {
        id: "5",
        email: "dmitryivanov@gmail.com",
        username: "5",
        status: AccountStatus.INVITED
    },
    {
        id: "6",
        email: "apetrov@gmail.com",
        username: "6",
        status: AccountStatus.DEACTIVATED
    },
    {
        id: "7",
        email: "sergeisidrov@gmail.com",
        username: "7",
        status: AccountStatus.ACTIVE
    },
    {
        id: "8",
        email: "maryaavosko@gmail.com",
        username: "8",
        status: AccountStatus.INVITED
    }
];

const documentShortData: TDocumentShortData[] = [
    {
        id: "document-4",
        title: "Бухгалтерский отчет за январь 2025.xls",
        createdAt: new Date("2023-05-05T11:40:00.000Z")
    },
    {
        id: "document-0",
        title: "Заявление на отпуск.doc",
        createdAt: new Date("2023-05-01T10:15:00.000Z")
    },
    {
        id: "document-1",
        title: "Заявление на декрет.docx",
        createdAt: new Date("2023-05-02T14:30:00.000Z")
    },
    {
        id: "document-8",
        title: "Функциональна схема.vsdx",
        createdAt: new Date("2023-05-09T12:00:00.000Z")
    },
    {
        id: "document-3",
        title: "Отчет по убыткам.pptx",
        createdAt: new Date("2023-05-04T16:20:00.000Z")
    },
    {
        id: "document-5",
        title: "График дежурств.xlsx",
        createdAt: new Date("2023-05-06T13:50:00.000Z")
    },
    {
        id: "document-6",
        title: "Чек оплаты.txt",
        createdAt: new Date("2023-05-07T09:25:00.000Z")
    },
    {
        id: "document-7",
        title: "Схема мультиплексора.vsd",
        createdAt: new Date("2023-05-08T15:35:00.000Z")
    },
    {
        id: "document-9",
        title: "Аппеляция.doc",
        createdAt: new Date("2023-05-10T17:45:00.000Z")
    },
    {
        id: "document-2",
        title: "План 4 этажа.ppt",
        createdAt: new Date("2023-05-03T08:45:00.000Z")
    }
];

const organization: TOrganization = {
    _id: "organization_id",
    documentAims: [
        {
            _id: "1",
            value: "На ознакомление"
        },
        {
            _id: "2",
            value: "На рассмотрение"
        }
    ],
    documentTypes: [
        {
            _id: "1",
            value: "Отпускные"
        },
        {
            _id: "2",
            value: "Ведомости"
        }
    ],
    administrativeDivisions: [
        {
            _id: "1",
            title: "Бухгалтерия",
            posts: [
                {
                    _id: "1",
                    title: "Бухгалтер"
                },
                {
                    _id: "2",
                    title: "Экономист"
                },
                {
                    _id: "3",
                    title: "Аналитик"
                }
            ]
        },
        {
            _id: "2",
            title: "Отдел кадров",
            posts: [
                {
                    _id: "1",
                    title: "Кадровик"
                },
                {
                    _id: "2",
                    title: "Юрист"
                }
            ]
        }
    ]
};

const versions: TVersion[] = [
    {
        id: "1",
        url: "",
        description: "Переделано под новый стандарт",
        createdAt: new Date("2025-05-17T17:16:00.000Z")
    },
    {
        id: "2",
        url: "",
        description: "Исправлено выравнивание второго абзаца",
        createdAt: new Date("2025-05-17T15:41:00.000Z")
    },
    {
        id: "3",
        url: "",
        description: "Исправлена дата начала отпуска",
        createdAt: new Date("2025-05-15T10:06:00.000Z")
    },
    {
        id: "4",
        url: "",
        description: "Начальная версия",
        createdAt: new Date("2025-05-14T12:56:00.000Z")
    }
];

export const mocks = {
    document,
    documentShortData,
    profile,
    verifyDocumentHashDto,
    comments,
    notifications,
    users,
    organization,
    versions
};
