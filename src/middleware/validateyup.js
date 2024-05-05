const formValidate =
  (schema, useQuery = false) =>
  async (req, res, next) => {
    const data = useQuery ? req.query : req.body;
    try {
      await schema.validate(data);
      next();
    } catch (error) {
      const YupValidationError = new Error(error.message);
      YupValidationError.name = "YupValidationError";
      next(YupValidationError);
    }
  };

module.exports = formValidate;
