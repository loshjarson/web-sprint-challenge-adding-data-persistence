const db = require("../../data/dbConfig");

const convertIntegersToBoolean = (task) => {

    task.task_completed = (task.task_completed ? true : false)
    return task
}

const convertBooleansToInteger = (task) => {

    task.task_completed = (task.task_completed ? 1 : 0)
    return task

}

function getAll() {
    return db('tasks as t')
    .leftJoin("projects as p", "t.project_id", "p.project_id")
    .select("t.task_description", "t.task_notes", "t.task_completed", "p.project_name", "p.project_description")
    .then(tasks => {
        tasks.forEach(task =>
        convertIntegersToBoolean(task)
        )
        return tasks
    })
}

function findById(task_id) {
    return db('tasks')
        .where({ task_id }).first()
        .then(task => {task
            return convertIntegersToBoolean(task)
        })
}

function add(task) {
    const newTask = convertBooleansToInteger(task)
    return db("tasks")
    .insert(newTask, 'task_id')
    .then(([task_id]) => findById(task_id));
}

module.exports = {
  getAll,
  add,
  findById,
};
