import {
  interviewReport,
  getAllReports,
  getReportById,
} from "../services/interview.api.js";
import { InterviewContext } from "../interview.context.jsx";
import { useContext } from "react";

export const useInterview = () => {
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
        return true;
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
        return true;
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
        return true;
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
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
