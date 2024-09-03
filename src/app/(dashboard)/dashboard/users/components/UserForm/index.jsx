import PropTypes from "prop-types";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import UseFormContent from "./UseFormContent";

const UserForm = async ({ userId }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["user", userId],
    queryFn: async () => (await UserService.findById(userId)).data,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UseFormContent userId={userId} />
    </HydrationBoundary>
  );
};

export default UserForm;
UserForm.propTypes = {
  userId: PropTypes.string,
};
