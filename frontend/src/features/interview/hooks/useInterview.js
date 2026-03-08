import {
  interviewReport,
  getAllReports,
  getReportById,
} from "../services/interview.api.js";
import { InterviewContext } from "../interview.context.jsx";
import { useContext, useEffect } from "react";
import { useParams } from "react-router";

export const useInterview = () => {
  const {interviewId} = useParams()
  const context = useContext(InterviewContext);
  const { report, setReport, loading, setLoading, reports, setReports } =
    context;

  const handleInterviewReport = async ({
    selfDescription,
    jobDescription,
    resume,
  }) => {
    try {
      setLoading(true);

      const data = await interviewReport({
        selfDescription,
        jobDescription,
        resume,
      });

      if (data && data.interviewReport) {
        setReport(data.interviewReport);
        return data.interviewReport;
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGetInterviewReportById = async (interviewId) => {
    try {
      setLoading(true);

      const data = await getReportById(interviewId);

      if (data && data.interviewReport) {
        setReport(data.interviewReport);
        return data.interviewReport
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGetAllReports = async () => {
    try {
      setLoading(true);
      const data = await getAllReports();

      if (data && data.interviewReport) {
        setReports(data.interviewReport);
        return data.interviewReport;
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    if (interviewId){
      handleGetInterviewReportById(interviewId)
    }else{
      handleGetAllReports()
    }
  },[interviewId])
  return {
    loading,
    setLoading,
    report,
    setReport,
    reports,
    setReports,
    handleInterviewReport,
    handleGetInterviewReportById,
    handleGetAllReports,
  };
};
