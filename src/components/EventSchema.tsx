import React from "react";
import CodeBlock from "@theme/CodeBlock";
import deepmerge from "deepmerge";
// @ts-ignore
import JSONSchemaViewer from "@theme/JSONSchemaViewer";

const resolverOptions = {
  resolvers: {
    https: {
      resolve: (ref: string) => {
        return new Promise((resolve, reject) => {
          fetch(ref.toString(), {
            headers: {
              Accept: "application/json",
            },
          })
            .then((response) => response.json())
            .then((response) => {
              console.log(response);
              return response;
            })
            .then((result) => resolve(result))
            .catch((err) => reject(err));
        });
      },
    },
  },
  transformDereferenceResult: (result) => {
    // merge the resolved schema back with the original, so that the descriptions/examples aren't thrown away
    const merged = deepmerge(props.schema, result.result, {
      arrayMerge: (_, source) => source,
    });
    return Promise.resolve({ result: merged });
  },
};

const viewerOptions = {
  showExamples: true,
};

export default function EventSchema(props: { schema: object }): JSX.Element {
  return (
    <div>
      <JSONSchemaViewer
        schema={props.schema}
        resolverOptions={resolverOptions}
        viewerOptions={viewerOptions}
      />
      JSON Schema :
      <CodeBlock language="json">
        {JSON.stringify(props.schema, null, 2)}
      </CodeBlock>
    </div>
  );
}
