class TasksController < ApplicationController
  
  respond_to :html, :js
  
  def create
    @project = current_user.projects.find(params[:project_id])
    @task = @project.tasks.create(task_params)
    unless @task.save   
      render :nothing => true  
    end 

  end
  
  def update
    @project = current_user.projects.find(params[:project_id])
    @task = @project.tasks.find(params[:id])
    @task.update_attributes(task_params)
    unless @task.save   
      render :nothing => true  
    end
  end

  def destroy
    @project = current_user.projects.find(params[:project_id])
    @task = @project.tasks.find(params[:id])
    @task.destroy
  end

  def sort
    @project = current_user.projects.find(params[:project_id])
    @project.tasks.each do | task |
      task.position = params[:task].index(task.id.to_s)+1
      task.save
    end
    render :nothing => true
  end

  def sort_down
    @project = current_user.projects.find(params[:project_id])
    @task = @project.tasks.find(params[:id])
    @task.move_lower
    render :nothing => true
  end  

  private

  def task_params
    params.require(:task).permit(:name, :deadline, :status, :position)
  end

end
