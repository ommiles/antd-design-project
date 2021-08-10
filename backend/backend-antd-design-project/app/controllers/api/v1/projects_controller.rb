class Api::V1::ProjectsController < ApplicationController
    before_action :set_project, only: [:show, :update, :destroy]
    
    def index
        projects = Project.all
        render json: projects
    end

    def create
        project = Project.new(project_params)
        if project.save
            render json: project, status: :created
        else
            # render json: {error: @project.errors}, status: unprocessable_entity
            render json: {error: project.errors}, status: :unprocessable_entity
        end
    end

    def show
        render json: @project
    end

    def update
        if @project.update(edit_params)
            render json: @project
        else
            render json: {error: @project.errors}, status: :unprocessable_entity
        end
    end

    def destroy
        @project.destroy
        render json: @project
    end

    private

    def set_project
        @project = Project.find(params[:id])
    end

    def project_params
        params.require(:project).permit(:project_name)
    end

    def edit_params
        params.require(:project).permit(:project_name)
    end
end
