import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError() as Error;
  console.log(error);

  if (!isRouteErrorResponse(error)) {
    return null;
  }

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <h1 className="text-5xl leading-tight font-semibold mb-12">Sorry!</h1>
      <p className="leading-tight font-medium">
        An error has occured, come back tomorrow !
      </p>
      <br />
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
