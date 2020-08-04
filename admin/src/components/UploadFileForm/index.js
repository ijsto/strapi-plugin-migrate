import React, { useState } from 'react'
import { Label, Select, Button, Textarea } from '@buffetjs/core'
import { request } from "strapi-helper-plugin";
import Row from "../Row";

const UploadFileForm = () => {
  const [postgresString, setPostgresString] = useState("");

  const textChanged = async rawText => {
    setPostgresString(rawText);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await request("/migrate/uploadPostgres", {
        method: "POST",
        body: { postgresString }
      });
    } catch (e) {
      console.log("Error: ", e)
    }
  }


  return (

    <div style={{ padding: "1.8rem 1.5rem" }}>
      <h1>SQL Query</h1>
      <div>Paste in the raw SQL query of your User Permissions table</div>

      <Row>
        <Textarea
          name="rawTextarea"
          onChange={({ target: { value } }) => textChanged(value)}
          value={postgresString}
        />
      </Row>

      <Row>
        <Button
          label={'EXECUTE'}
          onClick={handleSubmit}
        />
      </Row>
    </div>
  );

}

export default UploadFileForm;