import useFetch from "../../hooks/useFetch";
import RequestError from "../UI/RequestError";
import MealItem from "./MealItem";

function Meals() {
  const {
    isFetching,
    fetchedData: meals,
    requestError,
  } = useFetch("http://localhost:3000/meals", "GET", []);

  if (isFetching) {
    return <p className="text-center">Fetching meals...</p>;
  }

  if (requestError) {
    return <RequestError title="Error" message={requestError.message} />;
  }

  return (
    <ul id="meals">
      {meals.map((meal) => {
        return <MealItem key={meal.id} meal={meal} />;
      })}
    </ul>
  );
}

export default Meals;
