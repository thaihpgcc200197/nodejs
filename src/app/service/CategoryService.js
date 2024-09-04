const {
  NOT_FOUND,
  OK,
  INTERNAL_SERVER_ERROR,
  NOT_ACCEPTABLE,
} = require("http-status-codes");
const { CategorySchema } = require("../schema");
const CategoryService = {
  Create(user_id, name) {
    const new_cate = new CategorySchema({ user: user_id, name });
    return new_cate.save();
  },
  async Update(user_id, cate_id, category_name) {

    try {
      const cate = await CategorySchema.findById({ _id: cate_id });
      if (!cate) {
        return { error: "Category not found", status: NOT_FOUND  };
      }
      if (user_id != cate.user._id) {                
        return {error:"This function is only performed by the author", status: NOT_ACCEPTABLE, };
      }
      cate.name=category_name;
      cate.save()
      return { success: "The category has been updated successfully", status: OK,};
    } catch (error) {
      return { error: error, mess: "INTERNAL SERVER ERROR", status: INTERNAL_SERVER_ERROR };
    }
  },  
  async Delete(user_id, cate_id) {
    try {
      const cate = await CategorySchema.findById({_id: cate_id  });
      if (!cate) {
        return { error: "Category not found", status: NOT_FOUND  };
      }
      if (user_id != cate.user._id) {
        return {error:"This function is only performed by the author",status: NOT_ACCEPTABLE,
        };
      }
      await CategorySchema.deleteOne(cate)  
      return { success: "The category has been updated successfully",status: OK,};
    } catch (error) {
      return { error: error, mess: "INTERNAL SERVER ERROR", status: INTERNAL_SERVER_ERROR };
    }
  },
  async View(user_id) {
    try {
      const listcate = await CategorySchema.find({user:user_id});
      if (!listcate) {
        return { error: "Category not found", status: NOT_FOUND  };
      }else {
        return listcate
      } 
    } catch (error) {
      return { error: error, mess: "INTERNAL SERVER ERROR", status: INTERNAL_SERVER_ERROR };
    }
  },
};

module.exports = CategoryService;
