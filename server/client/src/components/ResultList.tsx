import ResultTable from "./ResultTable";

function ResultList({ result }: { result: any[] }) {
  if (!Array.isArray(result)) {
    result = [result];
  }
  return (
    <table>
      <tbody>
        <tr>
          <th>{"result"}</th>
        </tr>
        {result.map((item, itemIndex) => (
          <tr key={itemIndex}>
            {typeof item === "object" ? (
              <td key={itemIndex}>
                <ResultTable resultKey={Object.keys(item)} result={item} />
              </td>
            ) : (
              <td key={itemIndex}>{item}</td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ResultList;
