export const formateData = (items) => {
  return items?.map((e) => {
    return {
      id: (e?.meetingUrl)===null?"":e?.meetingUrl,
      // meetingLink: e?.meetingUrl,
      organizer: e?.organizer,
      meetingTitle: e?.meetingTitle,
      timeZone: e?.timeZone,

      startTime: get_FormatDate(e?.startTime),

      endTime: get_FormatDate(e?.endTime),

      plateform: e?.plateform,

      meetingUrl: e?.meetingTitle,

      meetingStatus: e?.meetingStatus,
      botStatus: e?.botStatus,
      meetingLink:e?.recMetUrl

      // meetingCode: e.conferenceData?.entryPoints[0].meetingCode,

      // meetingPassword: e.conferenceData?.entryPoints[0].passcode,
    };
  });
};

export const removeLocalStorage = () => {
  localStorage.clear();
};
export const get_Token = () => {
  return localStorage.getItem("t_id");
};
export const get_FormatDate = (date) => {
  return new Date(date).toLocaleString();
};
export const get_UTCFormateDate = (date) => {
  let newDate = new Date(date);
  // console.log(newDate.getFullYear(),newDate.getMonth(),newDate.getDate());
  // const utcDate = new Date(
  //   Date.UTC(
  //     newDate.getFullYear(),
  //     newDate.getMonth(),
  //     newDate.getDate(),
  //     newDate.getHours(),
  //     newDate.getMinutes()
  //   )
  // );
let isoDate = newDate.toISOString()

  return isoDate;
};
