import "./App.css";
import { registerUser } from "./services/registerUser";
import { useForm } from "react-hook-form";

export function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const onSubmit = (data) => {
    registerUser(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>
            Email
            <input
              placeholder="Email"
              type="email"
              {...register("email", {
                required: true,
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              })}
            />
          {errors.email?.type === "required" && (
            <span className="error" role="alert">email is required</span>
            )}
          {errors.email?.type === "pattern" && (
            <span className="error" role="alert">email is invalid</span>
            )}
            </label>
        </div>

        <div>
          <label>
            Name
            <input
              placeholder="Name"
              type="text"
              {...register("name", {
                required: true,
              })}
            />
          {errors.name?.type === "required" && (
            <span className="error" role="alert">
              name is required
            </span>
          )}
          </label>
        </div>

        <div>
          <label>
            Age
            <input
              placeholder="Age"
              type="number"
              {...register("age", {
                required: true,
                min: 18,
              })}
            />
          </label>
          {errors.age?.type === "required" && (
            <span className="error" role="alert">
              age is required
            </span>
          )}
          {errors.age?.type === "min" && (
            <span className="error" role="alert">
              you must be above 18 to register
            </span>
          )}
        </div>

        <div>
          <label>
            Password
            <input
              placeholder="Password"
              type="password"
              {...register("password", {
                required: true,
                minLength: 6,
              })}
            />
          </label>
          {errors.password?.type === "required" && (
            <span className="error" role="alert">
              password is required
            </span>
          )}
          {errors.password?.type === "minLength" && (
            <span className="error" role="alert">
              password is too short
            </span>
          )}
        </div>

        <div>
          <label>
            Password check
            <input
              placeholder="Password check"
              type="password"
              {...register("passwordcheck", {
                required: true,
                validate: (value) => value === getValues("password"),
              })}
            />
          </label>
          {errors.passwordcheck?.type === "required" && (
            <span className="error" role="alert">
              password check is required
            </span>
          )}
          {errors.passwordcheck?.type === "validate" && (
            <span className="error" role="alert">
              passwords do not match
            </span>
          )}
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              {...register("acceptTerms", {
                required: true,
              })}
            />
            Accept terms & conditions: Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Pellentesque pharetra, tortor ac placerat
            elementum, neque libero luctus mi, ut efficitur nisl mauris at nisl.
            Suspendisse non neque et neque facilisis convallis. Praesent erat
            magna, sollicitudin eu porttitor ut, tincidunt sit amet urna.
            Vestibulum congue neque metus.
          </label>
          {errors.acceptTerms?.type === "required" && (
            <span className="error" role="alert">
              please read and accept the terms and conditions
            </span>
          )}
        </div>

        <button disabled={Object.keys(errors).length > 0}>
          Sign up
        </button>
      </form>
    </div>
  );
}
