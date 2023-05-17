import { expect, test, describe } from "@jest/globals";

import { derefSchemaPath } from "../../src/plugins/deref-json-schemas/deref-json-schema";

describe("deref-json-schemas", () => {
  test("keeps the description when merging", async () => {
    const result = await derefSchemaPath(
      "schemas/com.mbta.ocs.raw_message.json"
    );
    expect(result).toMatchObject({
      properties: {
        id: {
          description: expect.stringMatching(/.+/),
        },
      },
    });
    expect(result["$defs"]).toBeUndefined();
    expect(result).not.toMatchObject({
      properties: {
        id: {
          $ref: expect.anything(),
        },
      },
    });
  });

  test("does not duplicate array items", async () => {
    const result = await derefSchemaPath(
      "schemas/com.mbta.ocs.raw_message.json"
    );
    expect(result["required"]).toEqual([
      "id",
      "source",
      "specversion",
      "type",
      "data",
      "time",
      "partitionkey",
    ]);
  });
});
