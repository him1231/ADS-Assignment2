import { getKey } from "../constant";
import { item } from "../utils/API";

function ResultTable({
  resultKey,
  result,
  deep = false,
}: {
  resultKey: string[];
  result: item[] | item;
  deep?: boolean;
}) {
  if (!Array.isArray(result)) {
    result = [result];
  }
  return (
    <table>
      <tbody>
        <tr>
          {resultKey.map((key, index) => (
            <th key={index}>{key}</th>
          ))}
        </tr>
        {result.map((item, itemIndex) => (
          <tr key={itemIndex}>
            {resultKey.map((key, keyIndex) => {
              if (typeof item[key] === "object") {
                const deepResultKey: string[] = getKey(key, deep);
                const deepResult: item[] = item[key] as item[];
                return (
                  <td key={"" + itemIndex + keyIndex}>
                    {
                      <ResultTable
                        resultKey={deepResultKey}
                        result={deepResult}
                        deep
                      />
                    }
                  </td>
                );
              }
              return <td key={"" + itemIndex + keyIndex}>{item[key]}</td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ResultTable;
