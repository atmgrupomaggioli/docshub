import { cx } from "@/utils/cx";

interface iAlert {
  type?: 'success' | 'error' | 'warning' | 'info';
  message: string;
}

const Alert = (props: iAlert) => {
  const getAlertStyles = () => {
    switch (props.type) {
      case 'success':
        return 'bg-green-100 border-green-500 text-green-700';
      case 'error':
        return 'bg-red-100 border-red-500 text-red-700';
      case 'warning':
        return 'bg-yellow-100 border-yellow-500 text-yellow-700';
      default:
        return 'bg-blue-100 border-blue-500 text-blue-700';
    }
  };
  
  return (
    <div className={cx("border-l-8 pl-2 rounded-md my-2 py-3", getAlertStyles(), "flex flex-col sm:flex-row sm:gap-2")} role="alert">
      <p className="font-bold my-0">{props.type?.toUpperCase()}</p>
      <p className="my-0">{props.message}</p>
    </div>
  );
};

export default Alert;
