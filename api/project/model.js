const db = require('../../data/dbConfig');

const convertIntegersToBoolean = (project) => {

    project.project_completed = (project.project_completed ? true : false)
    return project
}

const convertBooleansToInteger = (project) => {

    project.project_completed = (project.project_completed ? 1 : 0)
    return project

}


function getAll() {
  return db('projects')
    .then(projects => {
        projects.forEach(project =>
        convertIntegersToBoolean(project)
        )
        return projects
    })
}

function findById(project_id) {
  return db('projects')
    .where({ project_id }).first()
    .then(project => {
        return convertIntegersToBoolean(project)
    })
}

function add(project) {
    const newProject = convertBooleansToInteger(project)
    return db("projects")
        .insert(newProject, 'project_id')
        .then(([project_id]) => findById(project_id));
}

module.exports = {
  add,
  getAll,
  findById,
};