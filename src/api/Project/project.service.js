const pool = require("../../config/database");
const { getProjectIdsByUsernameAlike } = require("../utils/ProjectUser")

const ValidStatuses = {
	Active: "active",
	Completed: "completed",
	Cancelled: "cancelled",
	OnHold: "on_hold",
    Planned: "planned"
}

const FilterFields = {
    Id: "project_id",
    CreatorId: "creator_id",
    Status: "status",
    CreatedAt: "created_at",
	Name: "name",
    Description: "description",
}

const OrderArrangments = {
	AscendingOrder: "ASC",
	DescendingOrder: "DESC",
}

function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

module.exports = {
    // Data from the controller
    // Callback inside the method
    create: (data, callBack) => {
        const query = `INSERT INTO project(project_id, creator_id, status, created_at, name, description) 
            VALUES (?,?,?,?,?,?)`
        if (!Object.values(ValidStatuses).includes(data.status)){
            return callBack({message: 'Not a valid status'})
        }
        pool.query(
            query,
            [
                null,
                data.creator_id,
                data.status,
                data.created_at,
                data.name,
                data.description
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error)
                } 
                return callBack(null, results)
            }
        );
    },
    getProjects: (data, callBack) => {
        const query = "SELECT * FROM project"
        pool.query(
            query,
            (error, results, fields) => {
                if(error) {
                    console.log(error)
                    return callBack(error)
                } 
                return callBack(null, results)
            }
        );
    },
    intelligentDynamicProjectGetter: async (data, callBack) => {
        let filters = "";
        const orderArrange = data.order_arrange;
        const projectField = data.project_field;
        const currentPage = data.current_page;
        const paginationJump = data.pagination_jump;
        const creator_name = data.creator_name;
        let project_ids_by_creator = []
        let filterCount = 0;
        if (creator_name) {
            try{
                project_ids_by_creator = await getProjectIdsByUsernameAlike(creator_name);
                const project_ids = project_ids_by_creator.map(value => value.project_id);
                const stringIds = project_ids.length > 0 ? project_ids.join(",") : "-1";
                filters += "WHERE project_id IN (" + stringIds.toString() + ") " 
                filterCount++;
            } catch(error){
                console.log(error)
            }
        }
        // Si se repiten campos ignorar, crear un diccionario para asegurarlo
        for ( i in data ) {
            if (Object.values(FilterFields).includes(i)){
                if (data[i.toString()] != null) {
                    console.log(i)
                    if(filterCount != 0){
                        filters += "AND ";
                    } else {
                        filters += "WHERE ";
                    }
                    if (!isNumeric(data[i])) {
                        filters += i + " LIKE " +"'%"+ data[i.toString()]+ "%' ";
                    } else {
                        filters += i + " = " + data[i] + " ";
                    }
                    filterCount++;
                }
            }
        }
        const arrange = (Object.values(OrderArrangments).includes(orderArrange) && Object.values(FilterFields).includes(projectField) ? "ORDER BY " + projectField + " " + orderArrange : "");
        let getSizeQuery = "SELECT COUNT(*) FROM project " 
            + filters
            + arrange
        pool.query(
            getSizeQuery,
            (error, results, fields) => {
                if(error) {
                    return callBack(error)
                } 
                const filteredProjectSize = results[0]["COUNT(*)"]
                let query = "SELECT * FROM project " 
                + filters
                + arrange
                if (currentPage != null && paginationJump != null) {
                    query += " LIMIT " + paginationJump.toString() + " OFFSET " + ((currentPage) * paginationJump).toString();
                } 
                pool.query(
                    query,
                    (error, results, fields) => {
                        if(error) {
                            return callBack(error)
                        } 
                        let query = "SELECT * FROM project " 
                        + filters
                        + (Object.values(OrderArrangments).includes(orderArrange) && Object.values(FilterFields).includes(projectField) ? "ORDER BY " + projectField + " " + orderArrange : "");
                        if (currentPage != null && paginationJump != null) {
                            query += " LIMIT " + paginationJump.toString() + " OFFSET " + ((currentPage) * paginationJump).toString();
                        } 
                        results = results;
                        return callBack(null, {results, filtered_projects_size: filteredProjectSize})
                    }
                )
            }
        )
    },
    getProjectById: (id, callBack) => {
        const query = `SELECT * FROM project WHERE project_id = ?`
        pool.query(
            query,
            [id],
            (error, results, fields) => {
                if(error) {
                    return callBack(error)
                } 
                return callBack(null, results[0])
            }
        )
    },
    updateProject: (data, callBack) => {
        const query = `UPDATE project SET status=?, name=?, description=? 
            WHERE project_id=?`
        if (!Object.values(ValidStatuses).includes(data.status)){
            return callBack({message: 'Could not update, invalid status'})
        }
        pool.query(
            query,
            [
                data.status,
                data.name,
                data.description,
                data.id
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error)
                } 
                return callBack(null, results)
            }
        );
    },
    deleteProject: (data, callBack) => {
        const query = `DELETE FROM project WHERE project_id = ?`
        pool.query(
            query,
            [data.id],
            (error, results, fields) => {
                if(error) {
                    return callBack(error)
                } 
                return callBack(null, results)
            }
        )
    },
}