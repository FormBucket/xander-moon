/** @jsx h */
/**
 * Copyright (c) 2015-2018, FormBucket.com
 */
import { h } from "preact";
import Guide from "./Guide";

let GuideMergeTags = () => (
  <Guide
    title="Querying your data"
    title2="Access your data with the power of GraphQL."
  >
    <div>
      <span>
        <p>
          Our version 2 API offers a{" "}
          <a href="https://foundation.graphql.org/">GraphQL</a> interface to{" "}
          <a href="/query">query your data</a>. To use our RESTFUL API see{" "}
          <a href="/openapi/ui" native>
            version 1 documentation
          </a>
          .
        </p>
        <h3>Example Queries</h3>
        <h4>Your Email</h4>
        <textarea
          rows="3"
          value={`{ 
  viewer { email }
}`}
        />
        <h4>Your Buckets</h4>
        <textarea
          rows="10"
          value={`{
  buckets {
    nodes {
      id
      submissions {
        totalCount
      }
    }
  }
}`}
        />
        <h4>Your Submissions</h4>
        <textarea
          rows="10"
          value={`{
  bucket(id: $id) {
    submissions {
      totalCount
      nodes {
        data
      }
    }
  }
}
`}
        />
      </span>
    </div>
  </Guide>
);
export default GuideMergeTags;
