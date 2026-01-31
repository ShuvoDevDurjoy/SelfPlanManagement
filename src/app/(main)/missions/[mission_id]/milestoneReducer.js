export const MilestoneActionTypes = {
  CREATE_MILESTONE: 1,
  UPDATE_MILESTONE: 2,
  DELETE_MILESTONE: 3,

  CREATE_TASK: 10,
  UPDATE_TASK: 11,
  DELETE_TASK: 12,
};

function createMilestone(state, milestone) {
  if (!milestone) {
    return { ...state };
  } else {
    return {
      ...state,
      milestone_ids: [...state.milestone_ids, milestone._id],
      milestone_by_ids: {
        ...state.milestone_by_ids,
        [milestone._id]: milestone,
      },
    };
  }
}

function updateMilestone(state, id, milestone) {
  if (!id) return { ...state };
  else {
    const completed_task = state.milestone_by_ids[id].completed_task;
    const tasks = state.milestone_by_ids[id].tasks;
    console.log("While updating: ", {
      ...state,
      milestone_by_ids: {
        ...state.milestone_by_ids,
        [id]: {
          ...milestone,
          tasks: [...tasks],
          completed_task: completed_task,
        },
      },
    });
    return {
      ...state,
      milestone_by_ids: {
        ...state.milestone_by_ids,
        [id]: {
          ...milestone,
          tasks: [...tasks],
          completed_task: completed_task,
        },
      },
    };
  }
}

function deleteMilestone(state, id) {
  if (!id) return { ...state };

  const milestone = state.milestone_by_ids[id];
  if (!milestone) return { ...state };

  const taskIdsToDelete = milestone.tasks || [];

  // 1. Remove milestone id
  const milestone_ids = state.milestone_ids.filter((m_id) => m_id !== id);

  // 2. Remove milestone object
  const milestone_by_ids = Object.fromEntries(
    Object.entries(state.milestone_by_ids).filter(([m_id]) => m_id !== id),
  );

  // 3. Remove tasks belonging to this milestone
  const tasks_ids = state.tasks_ids.filter(
    (t_id) => !taskIdsToDelete.includes(t_id),
  );

  const tasks_by_ids = Object.fromEntries(
    Object.entries(state.tasks_by_ids).filter(
      ([t_id]) => !taskIdsToDelete.includes(t_id),
    ),
  );

  return {
    ...state,
    milestone_ids,
    milestone_by_ids,
    tasks_ids,
    tasks_by_ids,
  };
}


function createTask(state, milestone_id, task) {
  if (!milestone_id || !task) {
    return {
      ...state,
    };
  } else {
    return {
      ...state,
      milestone_by_ids: {
        ...state.milestone_by_ids,
        [milestone_id]: {
          ...state.milestone_by_ids[milestone_id],
          tasks: [...state.milestone_by_ids[milestone_id].tasks, task._id],
        },
      },
      tasks_ids: [...state.tasks_ids, task._id],
      tasks_by_ids: { ...state.tasks_by_ids, [task._id]: task },
    };
  }
}

function updateTask(state, task_id, task) {
  if (!task_id || !task) {
    return {
      ...state,
    };
  } else {
    return {
      ...state,
      tasks_by_ids: { ...state.tasks_by_ids, [task_id]: task },
    };
  }
}
function deleteTask(state, milestone_id, id) {
    if (!milestone_id || !id) {
        return {
            ...state
        }
    }
    else {
        const milestone_task_ids = state.milestone_by_ids[milestone_id].tasks.filter((t_id) => t_id !== id);
        const task_ids = state.tasks_ids.filter((t_id) => t_id != id);

        const tasks = Object.fromEntries(Object.entries(state.tasks_by_ids).filter(([t_id]) => t_id != id));

      console.log(milestone_id)
      console.log(id)
      console.log(task_ids)
      console.log(tasks)
      console.log(milestone_task_ids)
      console.log(state);

        return {
            ...state, 
            milestone_by_ids: {
                ...state.milestone_by_ids, 
                [milestone_id]: {
                    ...state.milestone_by_ids[milestone_id], 
                    tasks: [...milestone_task_ids]
                }
            }, 
            tasks_ids: [...task_ids], 
            tasks_by_ids: {
                ...tasks
            }
        }
    }
}

export function MilestoneReducer(state, action) {
  switch (action.type) {
    case MilestoneActionTypes.CREATE_MILESTONE:
      return createMilestone(state, action.milestone);
    case MilestoneActionTypes.UPDATE_MILESTONE:
      return updateMilestone(state, action.milestone_id, action.milestone);
    case MilestoneActionTypes.DELETE_MILESTONE:
        return deleteMilestone(state, action.milestone_id);
    case MilestoneActionTypes.CREATE_TASK:
      return createTask(state, action.milestone_id, action.task);
    case MilestoneActionTypes.UPDATE_TASK:
      return updateTask(state, action.task_id, action.task);
      case MilestoneActionTypes.DELETE_TASK:
          return deleteTask(state, action.milestone_id, action.id);
  }
}
