import axios from "axios";

export const normalize_montly_stats = (data, date) => {
    try {
        if (!data) return;

        const [year, month] = date.split("-").map(Number);

        const daysInMonth = new Date(year, month, 0).getDate();

        //reduce the array by the id
        const reduced_data = data.reduce((acc, curr) => {
            acc[curr._id] = curr;
            curr.ratio  = curr.completedCount / (curr.completedCount + curr.unCompletedCount);
            return acc;
        }, {});

        for (let i = 1; i <= daysInMonth; i++) {
            if(!reduced_data[i]) {
                reduced_data[i] = {
                    _id: i,
                    completedCount: 0,
                    unCompletedCount: 0,
                    ratio: 0
                }
            }
        }

        return reduced_data;
    } catch (e) {
        console.log(e)
        return {
            success: false,
            message: "Error while normalizing the monthly stats"
        }
    }
}

export const getNormalizedChartData = (monthly_plan_stats, monthSelected) => {
    try {
        if (!monthly_plan_stats || !monthSelected) {
            return [];
        }

        // Use the normalization function
        const normalized = normalize_montly_stats(monthly_plan_stats, monthSelected);
        
        if (!normalized || normalized.success === false) {
            console.log("Error normalizing data:", normalized?.message);
            return [];
        }

        // Convert normalized object to array for recharts
        const dataArray = Object.entries(normalized).map(([key, value]) => ({
            day: value._id,
            completed: value.completedCount,
            uncompleted: value.unCompletedCount,
            total: value.completedCount + value.unCompletedCount,
            ratio: parseFloat((value.ratio * 100).toFixed(1)),
            completionRatio: value.ratio
        }));

        return dataArray;
    } catch (e) {
        console.error("Error in getNormalizedChartData:", e);
        return [];
    }
}

export const getMonthlyStatChartData = async(month) => {
    try {
        const response = await axios.get("/api/monthly_stats/" + month);
        if (!response.data.success) {
            return {
                success: false
            }
        }


        const monthly_plan_stats = getNormalizedChartData(response.data.monthly_plan_stats, month);


        return {
            success: true,
            monthly_plan_stats: monthly_plan_stats
        }
    } catch (e) {
        return {
            success: false,
        }
    }
}