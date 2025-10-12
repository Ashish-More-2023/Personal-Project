export const detectTimelineClash = (start1, end1 , start2, end2)=>{
    const s1 = new Date(start1);
    const e1 = new Date(end1);
    const s2 = new Date(start2);
    const e2 = new Date(end2);

    return (s1 <= e2) && (s2 <= e1);
};

export const findClashingTimelines = (timelines, currentTimeline) => {
    return timelines.filter(timeline =>{
        if(timeline.id === currentTimeline.id || timeline.timelineId === currentTimeline.id) return false; 
        return detectTimelineClash(currentTimeline.startDate, currentTimeline.endDate, timeline.startDate, timeline.endDate);
    });
};


export const isFutureDate = (date) => {
    return new Date(date) > new Date();
};

export const isValidDateRange = (startDate, endDate) => {
    return new Date(startDate) < new Date(endDate);
}