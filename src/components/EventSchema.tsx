import React from "react";
import CodeBlock from '@theme/CodeBlock';
import deepmerge from 'deepmerge';
// @ts-ignore
import JSONSchemaViewer from "@theme/JSONSchemaViewer";


export default function EventSchema(props: {schema: object}) : JSX.Element {
    return (
        <div>
<JSONSchemaViewer schema={ props.schema  } resolverOptions={{
  transformDereferenceResult: (result) => {
    // merge the resolved schema back with the original, so that the descriptions/examples aren't thrown away
    const merged = deepmerge(props.schema, result.result, {arrayMerge: (_, source) => source});
    return Promise.resolve({result: merged});
}
}} viewerOptions={{ showExamples: true }} />

JSON Schema :

<CodeBlock language="json">{JSON.stringify(props.schema, null, 2)}</CodeBlock>

        </div>);
}
