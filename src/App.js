import "./styles.css";
import React, { useState } from "react";
import { Formik, FieldArray, Field } from "formik";
const initialValues = {
  costCategory: {
    costCenters: [
      {
        id: 1,
        name: "abhi-01"
      },
      {
        id: 2,
        name: "anindya-01"
      },
      {
        id: 3,
        name: "sss-01"
      }
    ]
  },
  rows: [
    {
      cost: 995,
      row: 1,
      colDetails: [
        {
          costgoryName: "abhi-01",
          ccid: ""
        },
        {
          costgoryName: "anindya-01",
          ccid: ""
        },
        {
          costgoryName: "sss-01",
          ccid: ""
        }
      ]
    }
  ]
};
export default function App() {
  const { costCategory, rows } = initialValues;
  const [row, setRow] = useState(1);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => console.log(values)}
    >
      {({ values }) => (
        <form>
          <table>
            <thead>
              <tr>
                {costCategory.costCenters.map((costCenter) => (
                  <th key={costCenter.id}>{costCenter.name}</th>
                ))}
                <th>Cost</th>
              </tr>
            </thead>
            <tbody>
              <FieldArray name="rows">
                {({ push, remove }) => (
                  <>
                    {values.rows.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.colDetails.map((colDetail, colIndex) => (
                          <td key={colIndex}>
                            <Field
                              name={`rows.${rowIndex}.colDetails.${colIndex}.ccid`}
                            />
                          </td>
                        ))}
                        <td>
                          <Field name={`rows.${rowIndex}.cost`} />
                        </td>
                        <td>
                          <button
                            type="button"
                            onClick={() => push({ col: 0, ccid: "" })}
                          >
                            Add
                          </button>
                          <button
                            type="button"
                            onClick={() => remove(rowIndex)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan={costCategory.costCenters.length + 2}>
                        <button
                          type="button"
                          onClick={() =>
                            push({
                              cost: 0,
                              row: row + 1,
                              colDetails: costCategory.costCenters.map(
                                (costCenter) => ({
                                  costgoryName: costCenter.name,
                                  ccid: ""
                                })
                              )
                            })
                          }
                        >
                          Add Row
                        </button>
                      </td>
                    </tr>
                  </>
                )}
              </FieldArray>
            </tbody>
          </table>
          <button type="submit">Submit</button>
        </form>
      )}
    </Formik>
  );
}
