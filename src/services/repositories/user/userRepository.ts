import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { Entity, EntityItem } from "electrodb";
import { Table } from "sst/node/table";

const UserEntity = new Entity(
  {
    model: {
      version: "1",
      entity: "User",
      service: "myapp",
    },
    attributes: {
      userId: {
        type: "string",
        required: true,
        readOnly: true,
      },
      createdAt: {
        type: "number",
        required: true,
        default: () => Date.now(),
        readOnly: true,
      },
      email: {
        type: "string",
        required: false,
        readOnly: true,
      },
      picture: {
        type: "string",
        required: false,
      },
      name: {
        type: "string",
        required: false,
      },
    },

    indexes: {
      byUserId: {
        pk: {
          field: "pk",
          composite: ["userId"],
        },
        sk: {
          field: "sk",
          composite: [],
        },
      },
    },
  },
  {
    table: process.env.VERCEL === "1" ? Table.onboarding.tableName : "",
    client: new DynamoDBClient({}),
  },
);

export type UserRecord = EntityItem<typeof UserEntity>;
export type UserRecordInput = Omit<UserRecord, "createdAt">;

export async function addUser(userRecord: UserRecordInput) {
  const user = (await UserEntity.create({ ...userRecord }).go()).data;
  return user;
}

export async function getUserDetails(userId: string) {
  const userData = await UserEntity.get({ userId }).go();
  return userData.data;
}

export async function changeUserName(userId: string, userName: string) {
  const userData = await UserEntity.patch({ userId })
    .set({ name: userName })
    .go();
  return userData.data;
}
