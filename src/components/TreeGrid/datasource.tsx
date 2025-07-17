export let treegridData: Object[] = [];

export function createTreeGridData() {
    if (treegridData.length) {
        return;
    }
    let projectData = [];
    let taskID = 1000;
    let Rating: number[] = [1, 2, 3, 4, 5];
    let PriorityLevels: string[] = ["High", "Medium", "Low"];
    let Employees: string[] = ["Alice", "Bob", "Charlie", "David", "Emma"];
    let Departments: string[] = ["IT", "HR", "Finance", "Marketing", "Operations"];

    for (let i = 1; i <= 2500; i++) {
        let parentTaskID = taskID;
        let imageIndex: number = i % 9;
        let estimatedCost = Math.floor(Math.random() * 9000) + 1000;
        let actualCost = Math.floor(Math.random() * 11500) + 500;
        let costDifference = actualCost - estimatedCost;

        treegridData.push({
            'TaskID': parentTaskID, // Keep plain value for hierarchy
            'TaskLink': parentTaskID,
            'TaskName': `Project Phase ${i}`,
            'StartDate': new Date(2024, 0, i % 12 + 1),
            'EndDate': new Date(2024, 0, (i % 12) + 5),
            'Duration': Math.floor(Math.random() * 10) + 3,
            'Progress': Math.floor(Math.random() * 100),
            'Status': i % 2 === 0 ? "In Progress" : "Completed",
            // 'ParentID': null,
            'Priority': PriorityLevels[Math.floor(Math.random() * PriorityLevels.length)],
            'AssignedTo': Employees[Math.floor(Math.random() * Employees.length)],
            'Department': Departments[Math.floor(Math.random() * Departments.length)],
            'EstimatedCost': estimatedCost,
            'ActualCost': actualCost,
            'CostDifference': costDifference
        });

        for (let j = 1; j <= 3; j++) {
            let imageIndex: number = i % 5;
            let estimatedCost = Math.floor(Math.random() * 9000) + 1000;
            let actualCost = Math.floor(Math.random() * 11500) + 500;
            let costDifference = actualCost - estimatedCost;
            let childTaskID = ++taskID;

            treegridData.push({
                TaskID: childTaskID, // Keep plain numeric ID
                TaskLink: childTaskID, // Separate clickable link
                TaskName: `Task ${i}.${j}`,
                StartDate: new Date(2024, 0, (i % 12) + j + 1),
                EndDate: new Date(2024, 0, (i % 12) + j + 3),
                Duration: Math.floor(Math.random() * 7) + 1,
                Progress: Math.floor(Math.random() * 100),
                Status: j % 2 === 0 ? "In Progress" : "Completed",
                Rating: Rating[Math.floor(Math.random() * Rating.length)],
                ParentID: parentTaskID, // Ensuring child-parent relation
                Priority: PriorityLevels[Math.floor(Math.random() * PriorityLevels.length)],
                AssignedTo: Employees[Math.floor(Math.random() * Employees.length)],
                Department: Departments[Math.floor(Math.random() * Departments.length)],
                EstimatedCost: estimatedCost,
                ActualCost: actualCost,
                CostDifference: costDifference
            });
        }

        taskID++; // Ensure unique task IDs
    }
}

createTreeGridData()

let templateDetails: Object[] = treegridData;

export const projectDetails: Object[] = templateDetails;
