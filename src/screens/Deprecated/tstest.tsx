import React, { useReducer, FunctionComponent, Reducer, Dispatch } from "react";
import { apiUrl } from "../screens/const";
import { FC } from "react";

interface DataState {
  isSignedIn: boolean;
//   token: string;
  // add any other properties here
}

interface SignInProps {
  email: string;
  password: string;
}

// you can change this
// it is common to use a type for `Action` that is a union of your specific actions
interface Action {
  type: string;
  payload: any;
}

// this is where I am getting tricky
type BoundActions<T> = {
  [K in keyof T]: T[K] extends (d: Dispatch<Action>) => infer R ? R : never;
};
type ContextValue<T> = {
  state: DataState;
} & BoundActions<T>;

export const createDataContext = <T extends {}>(
  reducer: Reducer<DataState, Action>,
  actions: T,
  defaultValue: DataState
) => {
  // context needs a defaultValue
  const Context = React.createContext({
    state: defaultValue,
  } as ContextValue<T>);

  interface Props {
    children: any;
  }

  // type of children is known by assigning the type FunctionComponent to Provider
  const Provider: FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, defaultValue);

    const boundActions = {} as BoundActions<T>;
    for (let key in actions) {
      // @ts-ignore - I don't want to make a confusing mess so just ignore this
      boundActions[key] = actions[key](dispatch);
    }

    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };

  return { Context, Provider };
};

const authReducer = (state: DataState, action: Action): DataState => {
  switch (action.type) {
    default:
      return state;
  }
};

const signup = (dispatch: Dispatch<Action>) => {
  return async ({ email, password }: SignInProps) => {
    try {
      //   const response = await apiUrl.post('login', { email, password });
      const response = await fetch(apiUrl + "login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            email: email,
            password: password,
          },
        }),
      });
      console.log(response.json);
    } catch (error) {
      alert(error);
    }
  };
};

const signin = (dispatch: Dispatch<Action>) => {
  return ({ email, password }: SignInProps) => {};
};

const signout = (dispatch: Dispatch<Action>) => {
  return () => {};
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup },
  { isSignedIn: false }
);
