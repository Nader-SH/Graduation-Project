import sequelize from "../database/config/connection.js";
import Categories from "./categories.js";
import Comments from "./comments.js";
import Companys from "./companys.js";
import Courses from "./courses.js";
import FavoriteCourses from "./favoriteCourses.js";
import Notifications from "./notifications.js";
import Rates from "./rates.js";
import ReplyComment from "./replyComment.js";
import Reports from "./reports.js";
import Requests from "./requests.js";
import Sections from "./sections.js";
import SectionStatus from "./sectionStatus.js";
import User from "./user.js";



User.hasMany(FavoriteCourses, { foreignKey: "userId" });
FavoriteCourses.belongsTo(User, { foreignKey: "userId" });


Courses.hasMany(FavoriteCourses, { foreignKey: "courseId" });
FavoriteCourses.belongsTo(Courses, { foreignKey: "courseId" });


User.hasMany(Requests, { foreignKey: "userId" });
Requests.belongsTo(User, { foreignKey: "userId" });


User.hasMany(Comments, { foreignKey: "userId" });
Comments.belongsTo(User, { foreignKey: "userId" });

Comments.hasMany(ReplyComment, { foreignKey: "userId" });
ReplyComment.belongsTo(Comments, { foreignKey: "userId" });

User.hasMany(Rates, { foreignKey: "userId" });
Rates.belongsTo(User, { foreignKey: "userId" });


Categories.hasMany(Courses, { foreignKey: "categorieId" });
Courses.belongsTo(Categories, { foreignKey: "categorieId" });


Courses.hasMany(Sections, { foreignKey: "courseId" });
Sections.belongsTo(Courses, { foreignKey: "courseId" });


Sections.hasMany(Comments, { foreignKey: "sectionId" });
Comments.belongsTo(Sections, { foreignKey: "sectionId" });


Courses.hasMany(Rates, { foreignKey: "courseId" });
Rates.belongsTo(Courses, { foreignKey: "courseId" });


Courses.hasMany(Reports, { foreignKey: "courseId" });
Reports.belongsTo(Courses, { foreignKey: "courseId" });


User.hasMany(Reports, { foreignKey: "userId" });
Reports.belongsTo(User, { foreignKey: "userId" });


Sections.hasMany(Reports, { foreignKey: "sectionId" });
Reports.belongsTo(Sections, { foreignKey: "sectionId" });





export {
    sequelize, Categories, Comments, Companys, Courses, FavoriteCourses, Notifications, Rates, ReplyComment, Reports, Requests, Sections, SectionStatus, User
}