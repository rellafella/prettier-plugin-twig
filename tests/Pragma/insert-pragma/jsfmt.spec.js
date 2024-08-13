import { run_spec } from "tests_config/run_spec";
import { describe, expect, it } from "vitest";
import { format } from "prettier";
import plugin from "src/index";

describe("Pragma", () => {
    it("should insert pragma if option is set", async () => {
        const { actual, snapshotFile } = await run_spec(import.meta.url, {
            source: "insert-pragma.twig",
            formatOptions: {
                insertPragma: true
            }
        });
        await expect(actual).toMatchFileSnapshot(snapshotFile);
    });

    it("should not insert multiple pragma if option is set", async () => {
        const { actual, code, snapshotFile } = await run_spec(import.meta.url, {
            source: "insert-pragma.twig",
            formatOptions: {
                insertPragma: true
            }
        });
        const actualSecondRun = await format(actual, {
            parser: "twig",
            plugins: [plugin],
            insertPragma: true,
            tabWidth: 4
        });
        expect(actualSecondRun).toMatchFileSnapshot(snapshotFile);
    });

    it("should not insert pragma if option is not set", async () => {
        const { actual, code } = await run_spec(import.meta.url, {
            source: "insert-pragma.twig",
            formatOptions: {
                insertPragma: false
            }
        });
        expect(actual).toMatch(code);
    });
});
