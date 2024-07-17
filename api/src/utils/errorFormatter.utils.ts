import { ValidationError } from "class-validator";

export const errorFormatter = (errors: ValidationError[]) => {
  let subConstraints = [];
  let constraints = [];

  if (!errors[0].children.length) {
    const errorConstraints = errors.map(({ constraints }) =>
      constraints ? constraints : {}
    );

    constraints = errorConstraints.flatMap((error) => Object.values(error));
  } else if (errors[0].children.length)
    subConstraints = errors[0].children.map(
      ({ constraints }) => Object.values(constraints)[0]
    );
  return [...constraints, ...subConstraints];
};
