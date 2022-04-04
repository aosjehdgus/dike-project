import EditUserDialog from 'features/app/manage-user/components/manage-user-table/edit-user/EditUserDialog';

export default function EditUser(prop) {
  const { userInfo } = prop;
  return (
    <>
      <EditUserDialog userInfo={userInfo} />
    </>
  );
}
