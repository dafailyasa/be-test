const { faker } = require("@faker-js/faker");
const request = require("supertest");
const httpStatus = require("http-status");
const { ObjectId } = require("mongodb");
const app = require("../../src/app");
const setupTestDB = require("../utils/setup");

setupTestDB();

const mockTask = {
  title: faker.random.word(),
  description: faker.random.word(),
};

describe("TASK ROUTER", () => {
  describe("POST /api/tasks/create", () => {
    test("it sould be create tasks and success", async () => {
      const res = await request(app)
        .post("/api/task/create")
        .send(mockTask)
        .expect(httpStatus.OK);

      expect(res).toBeDefined();
      expect(res.body).toHaveProperty("title", mockTask.title);
      expect(res.body).toHaveProperty("description", mockTask.description);
      expect(res.body).toHaveProperty("status", false);
    });

    test("it sould be error if no have body payload", async () => {
      const res = await request(app)
        .post("/api/task/create")
        .send({})
        .expect(httpStatus.UNPROCESSABLE_ENTITY);

      expect(res).toBeDefined();
      expect(res.body).toHaveProperty("code", httpStatus.UNPROCESSABLE_ENTITY);
      expect(res.body.message).not.toBeNull();
    });
  });

  describe("GET /api/tasks/:id", () => {
    test("it should be find by id and return task", async () => {
      const { body } = await request(app)
        .post("/api/task/create")
        .send(mockTask)
        .expect(httpStatus.OK);
      expect(body._id).toBeDefined();
      expect(body._id).not.toBeNull();

      const res = await request(app)
        .get(`/api/task/${body._id}`)
        .send(mockTask)
        .expect(httpStatus.OK);
      expect(res).toBeDefined();
      expect(res.body).toHaveProperty("_id", body._id);
    });

    test("it should return error if id not valid mongo id object", async () => {
      const res = await request(app)
        .get(`/api/task/2`)
        .send(mockTask)
        .expect(httpStatus.UNPROCESSABLE_ENTITY);

      expect(res).toBeDefined();
      expect(res.body).toHaveProperty("code", 422);
    });

    test("it should return not found can't find task", async () => {
      randomID = new ObjectId();
      const res = await request(app)
        .get(`/api/task/${randomID}`)
        .send(mockTask)
        .expect(httpStatus.NOT_FOUND);

      expect(res).toBeDefined();
      expect(res.body).toHaveProperty("message", "task not found");
    });
  });

  describe("DELETE /api/tasks/:id", () => {
    test("it should be delete task and success", async () => {
      const { body } = await request(app)
        .post("/api/task/create")
        .send(mockTask)
        .expect(httpStatus.OK);
      expect(body._id).toBeDefined();
      expect(body._id).not.toBeNull();

      const updatedBody = {
        title: faker.random.words(),
        description: faker.random.words(),
      };

      const res = await request(app)
        .patch(`/api/task/${body._id}`)
        .send(updatedBody)
        .expect(httpStatus.OK);
      expect(res).toBeDefined();
      expect(res.body).toHaveProperty("_id", body._id);
      expect(res.body).toHaveProperty("title", updatedBody.title);
      expect(res.body).toHaveProperty("description", updatedBody.description);
    });

    test("it should return error if id not valid mongo id object", async () => {
      const res = await request(app)
        .patch(`/api/task/2`)
        .send(mockTask)
        .expect(httpStatus.UNPROCESSABLE_ENTITY);

      expect(res).toBeDefined();
      expect(res.body).toHaveProperty("code", 422);
    });

    test("it sould be error if no have body payload", async () => {
      const { body } = await request(app)
        .post("/api/task/create")
        .send(mockTask)
        .expect(httpStatus.OK);
      expect(body._id).toBeDefined();
      expect(body._id).not.toBeNull();

      const res = await request(app)
        .patch(`/api/task/${body._id}`)
        .send({})
        .expect(httpStatus.UNPROCESSABLE_ENTITY);

      expect(res).toBeDefined();
      expect(res.body).toHaveProperty("code", httpStatus.UNPROCESSABLE_ENTITY);
      expect(res.body.message).not.toBeNull();
    });
  });

  describe("PATCH /api/tasks/:id", () => {
    test("it should be update task and success", async () => {
      const { body } = await request(app)
        .post("/api/task/create")
        .send(mockTask)
        .expect(httpStatus.OK);
      expect(body._id).toBeDefined();
      expect(body._id).not.toBeNull();

      const updatedBody = {
        title: faker.random.words(),
        description: faker.random.words(),
      };

      const res = await request(app)
        .patch(`/api/task/${body._id}`)
        .send(updatedBody)
        .expect(httpStatus.OK);
      expect(res).toBeDefined();
      expect(res.body).toHaveProperty("_id", body._id);
      expect(res.body).toHaveProperty("title", updatedBody.title);
      expect(res.body).toHaveProperty("description", updatedBody.description);
    });

    test("it should return error if id not valid mongo id object", async () => {
      const res = await request(app)
        .patch(`/api/task/2`)
        .send(mockTask)
        .expect(httpStatus.UNPROCESSABLE_ENTITY);

      expect(res).toBeDefined();
      expect(res.body).toHaveProperty("code", 422);
    });

    test("it sould be error if no have body payload", async () => {
      const { body } = await request(app)
        .post("/api/task/create")
        .send(mockTask)
        .expect(httpStatus.OK);
      expect(body._id).toBeDefined();
      expect(body._id).not.toBeNull();

      const res = await request(app)
        .patch(`/api/task/${body._id}`)
        .send({})
        .expect(httpStatus.UNPROCESSABLE_ENTITY);

      expect(res).toBeDefined();
      expect(res.body).toHaveProperty("code", httpStatus.UNPROCESSABLE_ENTITY);
      expect(res.body.message).not.toBeNull();
    });
  });

  describe("DELETE /api/tasks/:id", () => {
    test("it should be deleted task", async () => {
      const { body } = await request(app)
        .post("/api/task/create")
        .send(mockTask)
        .expect(httpStatus.OK);

      expect(body._id).toBeDefined();
      expect(body._id).not.toBeNull();

      const res = await request(app)
        .delete(`/api/task/${body._id}`)
        .expect(httpStatus.OK);
      expect(res.body).toHaveProperty("deleted", true);
    });

    test("it should return deleted false if not found", async () => {
      randomID = new ObjectId();
      const res = await request(app)
        .delete(`/api/task/${randomID}`)
        .expect(httpStatus.OK);

      expect(res.body).toHaveProperty("deleted", false);
    });

    test("it should return error if id not valid mongo id object", async () => {
      const res = await request(app)
        .delete(`/api/task/2`)
        .expect(httpStatus.UNPROCESSABLE_ENTITY);

      expect(res).toBeDefined();
      expect(res.body).toHaveProperty("code", 422);
    });
  });

  describe("GET /api/tasks/search", () => {
    test("it should be return tasks", async () => {
      const { body } = await request(app)
        .post("/api/task/create")
        .send(mockTask)
        .expect(httpStatus.OK);
      expect(body._id).toBeDefined();
      expect(body._id).not.toBeNull();

      const res = await request(app)
        .get("/api/task/search")
        .expect(httpStatus.OK);

      expect(res).toBeDefined();
      expect(res.body.data.length).toBeGreaterThan(0);
      expect(res.body.count).toBeGreaterThan(0);
      expect(res.body.limit).toEqual(10);
    });
  });
});
