import connectDB from "@/db/connection";
import DailyPlan from "@/models/dailyPlanModel";

const getMontlyDailyPlanStats = async (month) => {
  try {
    // Parse month in format YYYY-MM
    const [year, monthNum] = month.split("-");

    if (!year || !monthNum) {
      return {
        success: false,
        message: "Invalid month format. Use YYYY-MM",
      };
    }

    const yearNum = parseInt(year);
    const monthNumber = parseInt(monthNum);

    // Validate month range
    if (monthNumber < 1 || monthNumber > 12) {
      return {
        success: false,
        message: "Month must be between 01 and 12",
      };
    }

    // Get first and last day of the month
    const firstDay = new Date(Date.UTC(yearNum, monthNumber - 1, 1));
    const lastDay = new Date(
      Date.UTC(yearNum, monthNumber, 0, 23, 59, 59, 999),
    );

    console.log("Fetching stats for month:", month);
    console.log("Date range:", firstDay, "to", lastDay);

    // Query database for plans in the given month
    const plans = await DailyPlan.aggregate([
      {
        $match: {
          start_time: {
            $gte: firstDay,
            $lte: lastDay,
          },
        },
      },
      {
        $group: {
          _id: {
            $dayOfMonth: {
              $dateTrunc: {
                date: "$start_time",
                unit: "day",
              },
            }
          },
          completedCount: {
            $sum: {
              $cond: [{ $eq: ["$status", "completed"] }, 1, 0],
            },
          },
          unCompletedCount: {
            $sum: {
              $cond: [{ $eq: ["$status", "not-completed"] }, 1, 0],
            },
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);
      if (plans) {
          return {
              success: true,
              data: [
                  ...plans
              ]
          }
      }

      return {
          success: false
      }
  } catch (e) {
    console.log("Error in getMontlyDailyPlanStats:", e);
    return {
      success: false,
      message: "Error fetching monthly stats",
    };
  }
};

export async function GET(req, { params }) {
  try {
    await connectDB();

    const { month } = await params;

    if (!month) {
      return Response.json(
        {
          success: false,
          message: "Month parameter is required (format: YYYY-MM)",
        },
        { status: 400 },
      );
    }

    const result = await getMontlyDailyPlanStats(month);

      return Response.json({
          success: true, 
          monthly_plan_stats: result.success? result.data: []
      })
  } catch (e) {
    console.log("Error in GET /api/monthly_stats/[month]:", e);
    return Response.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    );
  }
}
