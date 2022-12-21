export const formateData = (items) => {
  return items.map((e) => {
    return {
      id: e?.meetingId,
      organizer: e?.organizer,

      timeZone: e?.timeZone,
      
      startTime: get_FormatDate(e?.startTime),

      endTime: get_FormatDate(e?.endTime),

      plateform: e?.plateform,

      meetingUrl: e?.meetingUrl,

      // meetingCode: e.conferenceData?.entryPoints[0].meetingCode,

      // meetingPassword: e.conferenceData?.entryPoints[0].passcode,
    };
  });
};


export const removeLocalStorage = ()=>{
  localStorage.clear();
}
export const get_Token = ()=>{
  return localStorage.getItem('t_id')
}
export const get_FormatDate = (date)=>{
  return new Date(date).toLocaleString()
}