import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setToasts } from "../redux/slices/MeetingSlice";

function useToast() {
  const toasts = useAppSelector((quick_meet) => quick_meet.meetings.toasts);
  const dispatch = useAppDispatch();
  const createToast = ({
    title,
    type,
  }: {
    title: string;
    type: "success" | "primary" | "warning" | "danger" | undefined;
  }) => {
    dispatch(
      setToasts(
        toasts.concat({
          id: new Date().toISOString(),
          title,
          color: type,
        })
      )
    );
  };
  return [createToast];
}

export default useToast;
