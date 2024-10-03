import { cx } from "@/utils/cx";
import type { ReactNode } from "react";
import CopyToClipboard from "../copyToClipboard";

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
type Label = "DEPRECATED" | "BETA" | "ALPHA" | "STABLE";

interface iEndpoint {
  method: Method;
  title: string;
  description: string;
  path: string;
  label: Label;
  children: ReactNode;
  spaceTop?: boolean;
  spaceBottom?: boolean;
}

interface iMethodClasses {
  GET: string;
  POST: string;
  PUT: string;
  PATCH: string;
  DELETE: string;
}

interface iLabelClasses {
  ALPHA: string;
  BETA: string;
  STABLE: string;
  DEPRECATED: string;
}

const methodClasses: iMethodClasses = {
  GET: cx(
    "bg-green-400/20 text-green-600 dark:bg-green-400/20 dark:text-green-500",
  ),
  POST: cx(
    "bg-blue-400/20 text-blue-600 dark:bg-blue-400/20 dark:text-blue-500",
  ),
  PUT: cx(
    "bg-yellow-400/20 text-yellow-600 dark:bg-yellow-400/20 dark:text-yellow-500",
  ),
  PATCH: cx(
    "bg-indigo-400/20 text-indigo-600 dark:bg-indigo-400/20 dark:text-indigo-500",
  ),
  DELETE: cx("bg-red-400/20 text-red-600 dark:bg-red-400/20 dark:text-red-500"),
};

const labelClasses = {
  ALPHA: cx("text-rose-600 dark:text-rose-500"),
  BETA: cx("text-blue-600 dark:text-blue-500"),
  STABLE: cx("text-green-600 dark:text-green-500"),
  DEPRECATED: cx("text-red-600 dark:text-red-500"),
};

const optionClass = cx(
  "m-0 select-none rounded-md px-1.5 py-[1.5px] text-center text-sm font-medium leading-5",
);

const Endpoint = (props: iEndpoint) => {
  return (
    <section
      className={cx(props.spaceTop && "mt-4", props.spaceBottom && "mb-8")}
    >
      <div className="flex items-start space-x-0 pb-4 md:items-center md:space-x-4">
        <p
          className={cx(
            optionClass,
            "hidden md:block",
            props.method === "GET" && methodClasses.GET,
            props.method === "POST" && methodClasses.POST,
            props.method === "PUT" && methodClasses.PUT,
            props.method === "PATCH" && methodClasses.PATCH,
            props.method === "DELETE" && methodClasses.DELETE,
          )}
        >
          {props.method}
        </p>
        <div className="m-0 flex flex-col space-y-0">
          <h3 className="m-0 flex items-center space-x-3 font-medium">
            <span>{props.title}</span>
            <span
              className={cx(
                optionClass,
                "hidden rounded-none border-l-2 border-neutral-200 pl-3 text-[12px] uppercase dark:border-neutral-800 md:block",
                props.label === "ALPHA" && labelClasses.ALPHA,
                props.label === "BETA" && labelClasses.BETA,
                props.label === "DEPRECATED" && labelClasses.DEPRECATED,
                props.label === "STABLE" && labelClasses.STABLE,
              )}
            >
              {props.label}
            </span>
          </h3>
          <p className="mb-0 font-mono text-sm">{props.description}</p>
        </div>
      </div>
      <div className="flex-items mb-3 flex space-x-2 md:hidden">
        <p
          className={cx(
            optionClass,
            props.method === "GET" && methodClasses.GET,
            props.method === "POST" && methodClasses.POST,
            props.method === "PUT" && methodClasses.PUT,
            props.method === "PATCH" && methodClasses.PATCH,
            props.method === "DELETE" && methodClasses.DELETE,
          )}
        >
          {props.method}
        </p>
        <span
          className={cx(
            optionClass,
            "rounded-none border-l-2 border-neutral-200 pl-3 text-[12px] uppercase dark:border-neutral-800",
            props.label === "ALPHA" && labelClasses.ALPHA,
            props.label === "BETA" && labelClasses.BETA,
            props.label === "DEPRECATED" && labelClasses.DEPRECATED,
            props.label === "STABLE" && labelClasses.STABLE,
          )}
        >
          {props.label}
        </span>
      </div>
      <div className="flex flex-col items-center space-y-2 rounded-md border border-neutral-200 bg-neutral-200/50 py-1 pl-3 pr-1 dark:border-neutral-800 dark:bg-neutral-800/50 md:flex-row md:justify-between md:space-y-0">
        <span className="select-all overflow-x-auto font-mono text-sm tracking-tight">
          {props.path}
        </span>
        {/* <CopyToClipboard
          btnText="Copy Path"
          contentToCopy={props.path}
        /> */}
      </div>
      {props.children}
    </section>
  );
};

export default Endpoint;
