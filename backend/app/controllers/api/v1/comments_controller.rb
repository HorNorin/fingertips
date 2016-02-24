module Api
  module V1
    class CommentsController < BaseController
      before_action :authenticate

      rescue_from NoMethodError, with: :resource_not_found

      def index
        comments = Comment.where(tip_id: params[:tip_id])
          .paginate(page: params[:page])
        render json: comments
      end

      def create
        @comment = Comment.new(comment_params)
        if @comment.save
          render json: @comment
        else
          render_validation_errors
        end
      end

      def replies
        render json: find_comment.replies.paginate(page: params[:page])
      end

      def create_reply
        @comment = Comment.new(comment_params)
        if @comment.valid?
          find_comment.replies << @comment
          render json: @comment.reload
        else
          render_validation_errors
        end
      end

      private

      def comment_params
        params.require(:comment).permit(:body, :tip_id, :user_id)
      end

      def find_comment
        Comment.where('comments.id = ? AND comments.tip_id = ?',
          params[:id], params[:tip_id]).first
      end

      def render_validation_errors
        render json: {message: @comment.errors.full_messages},
          status: :unprocessable_entity
      end
    end
  end
end
