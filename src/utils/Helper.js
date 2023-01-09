export const formateData = (items) => {
  return items?.map((e) => {
    return {
      id: e?.meetingUrl === null ? "" : e?.meetingUrl,
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
      meetingLink: e?.recMetUrl,

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
  let isoDate = newDate.toISOString();

  return isoDate;
};

export const get_DiffTimeDuration = (d1, d2) => {
  var date1 = new Date(d1);
  var date2 = new Date(d2);

  var diff = date2.getTime() - date1.getTime();

  var msec = diff;
  var hh = Math.floor(msec / 1000 / 60 / 60);
  msec -= hh * 1000 * 60 * 60;
  var mm = Math.floor(msec / 1000 / 60);
  msec -= mm * 1000 * 60;
  var ss = Math.floor(msec / 1000);
  msec -= ss * 1000;
  return `${hh}h:${mm}m:${ss}s`   ;
};
