import {
  EuiFlyout,
  EuiFlyoutBody,
  EuiFlyoutHeader,
  EuiForm,
  EuiFormRow,
  EuiSpacer,
  EuiSwitch,
  EuiTitle,
} from "@elastic/eui";

import moment from "moment";
import React, { useEffect, useState } from "react";
import useFetchUsers from "../hooks/useFetchUsers";
import useToast from "../hooks/useToast";
import { firebaseDB } from "../utils/firebaseConfig";
import { FieldErrorType, MeetingType, UserType } from "../utils/types";
import { doc, updateDoc } from "firebase/firestore";
import MeetingName from "./Form/MeetingName";
import MeetingMaxUsers from "./Form/MeetingMaxUsers";
import MeetingUser from "./Form/MeetingUser";
import MeetingDate from "./Form/MeetingDate";
import CreateButtons from "./Form/CreateButtons";


export default function EditFlyout({
  closeFlyout,
  meeting,
}: {
  closeFlyout: any;
  meeting: MeetingType;
}) {
  const [users] = useFetchUsers();
  const [createToast] = useToast();
  const [meetingName, setMeetingName] = useState(meeting.meetingName);
  const [meetingType] = useState(meeting.meetingType);
  const [selectedUser, setSelectedUser] = useState<Array<UserType>>([]);
  const [startDate, setStartDate] = useState(moment(meeting.meetingDate));
  const [size, setSize] = useState(1);
  const [status, setStatus] = useState(false);
  const onUserChange = (selectedOptions: Array<UserType>) => {
    setSelectedUser(selectedOptions);
  };

  useEffect(() => {
    if (users) {
      const foundUsers: Array<UserType> = [];
      meeting.invitedUsers.forEach((user: string) => {
        const findUser = users.find(
          (tempUser: UserType) => tempUser.uid === user
        );
        if (findUser) foundUsers.push(findUser);
      });
      setSelectedUser(foundUsers);
    }
  }, [users, meeting]);

  const [showErrors] = useState<{
    meetingName: FieldErrorType;
    meetingUsers: FieldErrorType;
  }>({
    meetingName: {
      show: false,
      message: [],
    },
    meetingUsers: {
      show: false,
      message: [],
    },
  });

  const editMeeting = async () => {
    const editedMeeting = {
      ...meeting,
      meetingName,
      meetingType,
      invitedUsers: selectedUser.map((user: UserType) => user.uid),
      maxUsers: size,
      meetingDate: startDate.format("L"),
      status: !status,
    };
    delete editedMeeting.docId;
    const docRef = doc(firebaseDB, "meetings", meeting.docId!);
    await updateDoc(docRef, editedMeeting);
    createToast({ title: "Meeting updated successfully.", type: "success" });
    closeFlyout(true);
  };

  return (
    <EuiFlyout ownFocus onClose={() => closeFlyout()}>
      <EuiFlyoutHeader hasBorder>
        <EuiTitle size="m">
          <h2>{meeting.meetingName}</h2>
        </EuiTitle>
      </EuiFlyoutHeader>
      <EuiFlyoutBody>
        <EuiForm>
          <MeetingName
            label="Meeting name"
            isInvalid={showErrors.meetingName.show}
            error={showErrors.meetingName.message}
            placeholder="Meeting name"
            value={meetingName}
            setMeetingName={setMeetingName}
          />
          {meetingType === "anyone-can-join" ? (
            <MeetingMaxUsers value={size} setSize={setSize} />
          ) : (
            <MeetingUser
              label="Invite Users"
              isInvalid={showErrors.meetingUsers.show}
              error={showErrors.meetingUsers.message}
              options={users}
              onChange={onUserChange}
              selectedOptions={selectedUser}
              singleSelection={
                meetingType === "1-on-1" ? { asPlainText: true } : false
              }
              isClearable={false}
              placeholder="Select a Users"
            />
          )}
          <MeetingDate selected={startDate} setStartDate={setStartDate} />
          <EuiFormRow display="columnCompressedSwitch" label="Cancel Meeting">
            <EuiSwitch
              showLabel={false}
              label="Cancel Meeting"
              checked={status}
              onChange={(e) => setStatus(e.target.checked)}
            />
          </EuiFormRow>
          <EuiSpacer />
          <CreateButtons
            createMeeting={editMeeting}
            isEdit
            closeFlyout={closeFlyout}
          />
        </EuiForm>
      </EuiFlyoutBody>
    </EuiFlyout>
  );
}
