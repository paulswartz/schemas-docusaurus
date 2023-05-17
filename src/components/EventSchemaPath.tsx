import React, { useState, useEffect } from "react";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import CodeBlock from "@theme/CodeBlock";
// @ts-ignore
import JSONSchemaViewer from "@theme/JSONSchemaViewer";
import useBaseUrl from "@docusaurus/useBaseUrl";

const viewerOptions = {
  showExamples: true,
};

export default function EventSchemaPath(props: { event: object }): JSX.Element {
  const [error, setError] = useState(undefined);
  const [resolvedSchema, setResolvedSchema] = useState(undefined);
  const schemaRoot = useBaseUrl("/schemas");
  useEffect(() => {
    fetch(`${schemaRoot}/${props.event}.json`)
      .then((result) => result.json())
      .then(setResolvedSchema)
      .catch(setError);
  }, []);

  if (error != undefined) {
    return <div>Error: {error.message}</div>;
  } else if (resolvedSchema != undefined) {
    return (
      <Tabs>
        <TabItem value="schema" label="Schema" default>
          <JSONSchemaViewer
            schema={resolvedSchema}
            viewerOptions={viewerOptions}
          />
        </TabItem>
        <TabItem value="json" label="JSON">
          <CodeBlock language="json">
            {JSON.stringify(resolvedSchema, null, 2)}
          </CodeBlock>
        </TabItem>
      </Tabs>
    );
  } else {
    return <div>Loading {props.event}...</div>;
  }
}
